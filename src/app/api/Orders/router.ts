import { NextResponse } from "next/server";

let orders = [
  { id: 1, product: "Laptop", quantity: 2 },
  { id: 2, product: "Phone", quantity: 5 },
];

// GET: Lấy danh sách orders
export async function GET() {
  return NextResponse.json(orders);
}

// POST: Tạo order mới
export async function POST(req: Request) {
  const body = await req.json();
  const newOrder = { id: Date.now(), ...body };
  orders.push(newOrder);
  return NextResponse.json({ message: "Order created", data: newOrder });
}

// PUT: Cập nhật order
export async function PUT(req: Request) {
  const body = await req.json();
  orders = orders.map((o) => (o.id === body.id ? { ...o, ...body } : o));
  return NextResponse.json({ message: "Order updated", data: body });
}
