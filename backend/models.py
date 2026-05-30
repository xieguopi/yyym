from datetime import datetime
from sqlalchemy import Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database import Base


class Spec(Base):
    __tablename__ = "specs"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    weight: Mapped[str] = mapped_column(String, nullable=False)
    price: Mapped[float] = mapped_column(Float, nullable=False)
    note: Mapped[str] = mapped_column(String, nullable=False)
    tag: Mapped[str] = mapped_column(String, nullable=False)
    stock: Mapped[int] = mapped_column(Integer, default=100)

    orders: Mapped[list["Order"]] = relationship("Order", back_populates="spec")


class DeliveryDate(Base):
    __tablename__ = "delivery_dates"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    day: Mapped[str] = mapped_column(String, nullable=False)
    label: Mapped[str] = mapped_column(String, nullable=False)
    sub: Mapped[str] = mapped_column(String, nullable=False)

    orders: Mapped[list["Order"]] = relationship("Order", back_populates="delivery_date")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_no: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    spec_id: Mapped[str] = mapped_column(String, ForeignKey("specs.id"), nullable=False)
    qty: Mapped[int] = mapped_column(Integer, nullable=False)
    date_id: Mapped[str] = mapped_column(String, ForeignKey("delivery_dates.id"), nullable=False)
    recipient_name: Mapped[str] = mapped_column(String, nullable=False)
    recipient_phone: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    total: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    spec: Mapped["Spec"] = relationship("Spec", back_populates="orders")
    delivery_date: Mapped["DeliveryDate"] = relationship("DeliveryDate", back_populates="orders")


class Favorite(Base):
    __tablename__ = "favorites"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    session_id: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
