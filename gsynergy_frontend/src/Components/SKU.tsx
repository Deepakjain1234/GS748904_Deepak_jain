"use client";

import React, { useMemo, useState } from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addSku, updateSku, deleteSku } from "../redux/slices/skuSlice";
import { v4 as uuidv4 } from "uuid";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Define the SkuRow interface
interface SkuRow {
  seqNo: number;
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}

const Sku = () => {
  // Redux state and dispatch
  const skus = useAppSelector((state) => state.sku.skus);
  const dispatch = useAppDispatch();

  // Local state for form inputs
  const [skuData, setSkuData] = useState<SkuRow>({
    seqNo: skus.length + 1,
    id: "",
    label: "",
    class: "",
    department: "",
    price: 0,
    cost: 0,
  });

  // State to track edit mode
  const [editMode, setEditMode] = useState(false);

  // Column Definitions for AG Grid
  const [colDefs] = useState<ColDef[]>([
    { field: "id", headerName: "ID", width: 200 },
    { field: "label", headerName: "SKU Name", width: 200 },
    { field: "class", headerName: "Class", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "price", headerName: "Price", filter: "agNumberColumnFilter", width: 120 },
    { field: "cost", headerName: "Cost", filter: "agNumberColumnFilter", width: 120 },
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
            onClick={() => dispatch(deleteSku(params.data.id))}
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
    setSkuData({ ...skuData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add / Update)
  const handleSubmit = () => {
    if (editMode) {
      dispatch(updateSku(skuData));
    } else {
      dispatch(addSku({ ...skuData, id: uuidv4(), seqNo: skus.length + 1 }));
    }
    setSkuData({
      seqNo: skus.length + 1,
      id: "",
      label: "",
      class: "",
      department: "",
      price: 0,
      cost: 0,
    });
    setEditMode(false);
  };

  // Handle edit
  const handleEdit = (sku: SkuRow) => {
    setSkuData(sku);
    setEditMode(true);
  };

  return (
    <div style={{ width: "100%", height: "100vh", padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h1 style={{ textAlign: "center", color: "#333" }}>SKU List</h1>

      {/* Form for Adding / Updating SKU */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <input
          type="text"
          name="label"
          placeholder="SKU Name"
          value={skuData.label}
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
          name="class"
          placeholder="Class"
          value={skuData.class}
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
          name="department"
          placeholder="Department"
          value={skuData.department}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "120px",
          }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={skuData.price}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "100px",
          }}
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={skuData.cost}
          onChange={handleChange}
          style={{
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            width: "100px",
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
          {editMode ? "Update SKU" : "Add SKU"}
        </button>
      </div>

      {/* AG Grid Displaying SKU Data */}
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%", borderRadius: "8px", overflow: "hidden" }}>
        <AgGridReact
          rowData={skus}
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

export default Sku;
