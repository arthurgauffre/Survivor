from pydantic import BaseModel


class ClothesAllSchema(BaseModel):
    id: int
    customer_id: int
    type: str
    img_content: str | None
