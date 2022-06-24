import { Storage } from "@prisma/client";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addStorage } from "../features/storagesSlice";
import { centify } from "../utils/moneyUtils";
import { Button } from "./Button";

interface Props {
  onCreate: (storage: Storage) => void
}

export const NewStorageForm = (props: Props) => {
  const [name, setName] = useState("");
  const [startAmount, setSum] = useState(0);

  const dispatch = useDispatch();

  return <form onSubmit={async e => {
    e.preventDefault();
    const response = await axios.post<Storage>("/api/storages", {
      name,
      startAmount: centify(startAmount)
    });

    dispatch(addStorage(response.data));
    props.onCreate(response.data);
  }}>
    <table>
      <tbody>
        <tr>
          <td><label htmlFor="name">Name</label></td>
          <td><input type="text" id="name" value={name} onChange={e => setName(e.target.value)} /></td>
        </tr>
        <tr>
          <td><label htmlFor="sum">Sum</label></td>
          <td>
            <input
              type="number"
              step={0.01}
              id="sum"
              value={startAmount}
              onChange={e => setSum(Number(e.target.value))}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <Button type="submit">Submit</Button>
  </form>;
};
