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
    
    { field: "id", headerName: "ID" },
    { field: "label", headerName: "SKU Name" },
    { field: "class", headerName: "Class" },
    { field: "department", headerName: "Department" },
    { field: "price", headerName: "Price", filter: "agNumberColumnFilter" },
    { field: "cost", headerName: "Cost", filter: "agNumberColumnFilter" },
    {
      field: "actions",
      headerName: "Actions",
      cellRenderer: (params: any) => (
        <>
          <button onClick={() => handleEdit(params.data)}>Edit</button>
          <button onClick={() => dispatch(deleteSku(params.data.id))}>
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
    <div style={{ width: "100%", height: "100vh", padding: "20px" }}>
      <h1>SKU List</h1>

      {/* Form for Adding / Updating SKU */}
      {/* <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="label"
          placeholder="SKU Name"
          value={skuData.label}
          onChange={handleChange}
        />
        <input
          type="text"
          name="class"
          placeholder="Class"
          value={skuData.class}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={skuData.department}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={skuData.price}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost"
          value={skuData.cost}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editMode ? "Update SKU" : "Add SKU"}
        </button>
      </div> */}

      {/* AG Grid Displaying SKU Data */}
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={skus}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
};

export default Sku;
