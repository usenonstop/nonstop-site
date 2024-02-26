import type { ParkingLot } from "~/types/property";

export const ParkingLotsTable = ({
  parkingLots,
}: {
  parkingLots: ParkingLot[];
}) => {
  const acc: {
    id: string;
    size: string;
    type: string;
    notes: string | null;
    qty: number;
  }[] = [];
  const temp = [...parkingLots];
  while (temp.length > 0) {
    const firstEl = temp[0];
    if (!firstEl) break;
    const { size, type, notes } = firstEl;
    const idx = acc.findIndex(
      (el) => el.type === type && el.size === size && el.notes === notes,
    );
    if (idx === -1) {
      acc.push({ ...firstEl, qty: 1 });
      temp.shift();
      continue;
    }
    acc[idx]!.qty += 1;
    temp.shift();
  }

  acc.sort((a, b) => (a.qty > b.qty ? -1 : 1));

  return (
    <table className="">
      <tbody>
        {acc.map((p) => (
          <tr key={p.id} className="border-b text-sm">
            <td className="py-3">{p.qty}</td>
            <td className="py-3 first-letter:capitalize">
              {p.size.toLowerCase()}
            </td>
            <td className="py-3 first-letter:capitalize">
              {p.type.toLowerCase()}
            </td>
            <td className="py-3">{p.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
