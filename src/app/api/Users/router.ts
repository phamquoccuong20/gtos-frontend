import { NextResponse } from "next/server";

let users = [
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];


export async function GET() {
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newUser = {id: Date.now(), ...body};
  users.push(newUser);
  return NextResponse.json({ data: newUser, message: "User created" });
}

// PUT: Cập nhật user
export async function PUT(req: Request) {
  const body = await req.json();
  users = users.map((u) => (u.id === body.id ? { ...u, ...body } : u));
  return NextResponse.json({ message: "User updated", data: body });
}