import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/transactions" >Please click here to Redirect To Transaction Page</Link>
    </div>
  );
}
