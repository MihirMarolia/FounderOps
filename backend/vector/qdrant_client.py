"""Qdrant helper for storing and querying task embeddings."""

from typing import Iterable, List, Optional

from qdrant_client import QdrantClient
from qdrant_client.http import models as qmodels


class TaskEmbeddingStore:
    """Minimal wrapper around Qdrant collections for FounderOps tasks."""

    def __init__(self, host: str = "localhost", port: int = 6333, collection: str = "task_embeddings"):
        self.collection = collection
        self.client = QdrantClient(host=host, port=port)

    def ensure_collection(self, vector_size: int = 1536) -> None:
        """Create the collection if it does not exist."""

        if self.client.collection_exists(self.collection):
            return
        self.client.create_collection(
            collection_name=self.collection,
            vectors_config=qmodels.VectorParams(size=vector_size, distance=qmodels.Distance.COSINE),
            optimizers_config=qmodels.OptimizersConfigDiff(indexing_threshold=20000),
        )

    def ensure_indexes(self) -> None:
        """Ensure filterable fields are indexed for fast retrieval."""

        self.client.create_payload_index(
            collection_name=self.collection,
            field_name="project_id",
            field_schema=qmodels.PayloadSchemaType.KEYWORD,
            wait=True,
        )
        self.client.create_payload_index(
            collection_name=self.collection,
            field_name="priority",
            field_schema=qmodels.PayloadSchemaType.INTEGER,
            wait=True,
        )

    def upsert_tasks(
        self,
        items: Iterable[dict],
        *,
        vector_field: str = "embedding",
        metadata_fields: Optional[List[str]] = None,
    ) -> None:
        """Upsert a batch of tasks with embeddings into Qdrant."""

        metadata_fields = metadata_fields or ["project_id", "priority", "status", "title"]

        points = []
        for item in items:
            point_id = item["id"]
            vector = item[vector_field]
            payload = {key: item.get(key) for key in metadata_fields}
            points.append(qmodels.PointStruct(id=point_id, vector=vector, payload=payload))

        if points:
            self.client.upsert(collection_name=self.collection, points=points, wait=True)

    def query_similar(
        self,
        vector: List[float],
        *,
        top_k: int = 5,
        filters: Optional[qmodels.Filter] = None,
    ) -> List[qmodels.ScoredPoint]:
        """Search for the closest tasks by cosine similarity."""

        return self.client.search(
            collection_name=self.collection,
            query_vector=vector,
            limit=top_k,
            query_filter=filters,
            with_payload=True,
        )
