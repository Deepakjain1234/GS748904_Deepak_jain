"use client";

import React, { useMemo, useState } from "react";
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
    { field: "seqNo", headerName: "Seq No.", filter: true, width: 100 },
    { field: "id", headerName: "ID", width: 200 },
    { field: "label", headerName: "Store Name", width: 200 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      cellRenderer: (params: any) => (
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={() => handleEdit(params.data)}
          >
            Edit
          </button>
          <button
            style={{
              backgroundColor: "#F44336",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
            onClick={() => dispatch(deleteStore(params.data.id))}
          >
            Delete
          </button>
        </div>
      ),
    },
  ]);

  // Default column properties
  const defaultColDef = useMemo<ColDef>(
    () => ({
      filter: true,
      sortable: true,
      resizable: true,
      cellStyle: { textAlign: "left" }, // Center text in all cells
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
    <div style={{ width: "100%", height: "100vh", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Store List</h1>

      {/* Form for Adding / Updating Store */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <input
          type="text"
          name="label"
          placeholder="Store Name"
          value={storeData.label}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "150px",
          }}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={storeData.city}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "120px",
          }}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={storeData.state}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "120px",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 12px",
            backgroundColor: editMode ? "#FFC107" : "#007BFF",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {editMode ? "Update Store" : "Add Store"}
        </button>
      </div>

      {/* AG Grid Displaying Store Data */}
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%", borderRadius: "8px", overflow: "hidden" }}>
        <AgGridReact
          rowData={stores}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={50}
          rowHeight={40} // Increase row height for better readability
        />
      </div>
    </div>
  );
};

export default Store;
