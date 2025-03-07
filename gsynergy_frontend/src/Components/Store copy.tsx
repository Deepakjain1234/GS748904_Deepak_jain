"use client";

import React, { useMemo, useState, useCallback } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addStore, updateStore, deleteStore } from "../redux/slices/storeSlice";
import { v4 as uuidv4 } from "uuid";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Define the StoreRow interface
interface StoreRow {
  seqNo: number;
  id: string;
  label: string;
  city: string;
  state: string;
}

const Store = () => {
  // Redux state and dispatch
  const stores = useAppSelector((state) => state.store.stores);
  const dispatch = useAppDispatch();

  // Local state for form inputs
  const [storeData, setStoreData] = useState<StoreRow>({
    seqNo: stores.length + 1,
    id: "",
    label: "",
    city: "",
    state: "",
  });

  // State to track edit mode
  const [editMode, setEditMode] = useState(false);

  // Column Definitions for AG Grid
  const [colDefs] = useState<ColDef[]>([
    { field: "seqNo", headerName: "Seq No.", filter: true },
    { field: "id", headerName: "ID" },
    { field: "label", headerName: "Store Name" },
    { field: "city", headerName: "City" },
    { field: "state", headerName: "State" },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <>
          <button onClick={() => handleEdit(params.data)}>Edit</button>
          <button onClick={() => dispatch(deleteStore(params.data.id))}>
            Delete
          </button>
        </>
      ),
    },
  ]);

  // Default column properties
  const defaultColDef = useMemo<ColDef>(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
    }),
    []
  );

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add / Update)
  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateStore(storeData));
    } else {
      dispatch(addStore({ ...storeData, id: uuidv4(), seqNo: stores.length + 1 }));
    }
    setStoreData({ seqNo: stores.length + 1, id: "", label: "", city: "", state: "" });
    setEditMode(false);
  };

  // Handle edit
  const handleEdit = (store: StoreRow) => {
    setStoreData(store);
    setEditMode(true);
  };

  return (
    <div style={{ width: "100%", height: "100vh", padding: "20px" }}>
      <h1>Store List</h1>

      {/* Form for Adding / Updating Store */}
      {/* <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="label"
          placeholder="Store Name"
          value={storeData.label}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={storeData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={storeData.state}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editMode ? "Update Store" : "Add Store"}
        </button>
      </div> */}

      {/* AG Grid Displaying Store Data */}
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={stores}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default Store;
