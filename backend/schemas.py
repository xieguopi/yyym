from datetime import datetime
from pydantic import BaseModel, field_validator


class SpecOut(BaseModel):
    id: str
    name: str
    weight: str
    price: float
    note: str
    tag: str
    stock: int

    model_config = {"from_attributes": True}


class DeliveryDateOut(BaseModel):
    id: str
    day: str
    label: str
    sub: str

    model_config = {"from_attributes": True}


class OrderCreate(BaseModel):
    spec_id: str
    qty: int
    date_id: str
    recipient_name: str
    recipient_phone: str
    address: str

    @field_validator("qty")
    @classmethod
    def qty_range(cls, v: int) -> int:
        if not (1 <= v <= 20):
            raise ValueError("数量必须在 1 到 20 之间")
        return v

    @field_validator("recipient_phone")
    @classmethod
    def phone_format(cls, v: str) -> str:
        digits = v.replace("-", "").replace(" ", "")
        if len(digits) < 7:
            raise ValueError("手机号码格式不正确")
        return v


class OrderOut(BaseModel):
    id: int
    order_no: str
    spec_id: str
    qty: int
    date_id: str
    recipient_name: str
    recipient_phone: str
    address: str
    total: float
    created_at: datetime
    spec: SpecOut
    delivery_date: DeliveryDateOut

    model_config = {"from_attributes": True}


class StatsOut(BaseModel):
    remaining: int
    total_orders: int
