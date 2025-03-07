import React, { useState, useMemo,  useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {  useAppSelector } from "../redux/hooks";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { planningData } from "../Assets/Data/planningData";
// Define types''

interface PlanningRow {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
  salesDollars?: number;
  gmDollars?: number;
  gmPercent?: number;
}

interface Store {
  seqNo:number;
  id: string;
  label: string;
  city: string;
  state: string;
}

interface SKU {
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}

interface Calendar {
  seqNo:number;
  week: string;
  weekLabel: string;
  month: string;
  monthLabel: string;
}

interface PlanningData {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
}


ModuleRegistry.registerModules([AllCommunityModule]);

const PlanningGrid: React.FC = () => {
const stores: Store[] = useAppSelector((state) => state.store.stores);
const calendar: Calendar[] = useAppSelector((state) => state.calander.calendar);
const skus: SKU[] = useAppSelector((state) => state.sku.skus);
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    const crossJoinedData = stores.flatMap((store: Store) =>
      skus.map((sku: SKU) => ({
        store: store.id,
        sku: sku.id,
        storeLabel: store.label,
        skuLabel: sku.label,
        price: sku.price,
        cost: sku.cost,
      }))
    );

    const enrichedData = crossJoinedData.map((item) => {
      const planningEntries = planningData.filter(
        (p: PlanningData) => p.store === item.store && p.sku === item.sku
      );
      const weeklyData: Record<string, number> = {};
      planningEntries.forEach((entry) => {
        weeklyData[`salesUnits_${entry.week}`] = entry.salesUnits;
      });
      return { ...item, ...weeklyData };
    });

    setRowData(enrichedData);
  }, []);

  const columnDefsMemo = useMemo(() => {
    const weekColumns = calendar.map((week: Calendar) => ({
      headerName: week.weekLabel,
      children: [
        {
          headerName: "Sales Units",
          field: `salesUnits_${week.week}`,
          editable: true,
          valueFormatter: (params: { value?: number }): string =>
            params.value?.toString() ?? "0",
        },
        {
          headerName: "Sales Dollars",
          field: `salesDollars_${week.week}`,
          valueGetter: (params: { data: any }): number =>
            (params.data[`salesUnits_${week.week}`] || 0) * params.data.price,
          valueFormatter: (params: { value: number }): string =>
            `$${params.value.toFixed(2)}`,
        },
        {
          headerName: "GM Dollars",
          field: `gmDollars_${week.week}`,
          valueGetter: (params: { data: any }): number => {
            const salesDollars = params.data[`salesDollars_${week.week}`] || 0;
            const salesUnits = params.data[`salesUnits_${week.week}`] || 0;
            return   salesUnits * params.data.cost - salesDollars;
          },
          valueFormatter: (params: { value: number }): string =>
            `$${params.value.toFixed(2)}`,
        },
        {
          headerName: "GM %",
          field: `gmPercent_${week.week}`,
          valueGetter: (params: { data: any }): number => {
            
            
            const salesUnits = params.data[`salesUnits_${week.week}`] || 0;
            const salesDollars = salesUnits * params.data.price;
            const gmDollars = salesDollars- salesUnits * params.data.cost ;
            
            return salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
          },
          valueFormatter: (params: { value: number }): string =>
            `${params.value.toFixed(2)}%`,
          cellStyle: (params: { value: number }): React.CSSProperties => {
            if (params.value >= 40) return { backgroundColor: "green", color: "white" };
            if (params.value >= 10) return { backgroundColor: "yellow" };
            if (params.value >= 5) return { backgroundColor: "orange" };
            return { backgroundColor: "red", color: "white" };
          },
        },
      ],
    }));

    return [
      { headerName: "Store", field: "storeLabel" },
      { headerName: "SKU", field: "skuLabel" },
      ...weekColumns,
    ];
  }, []);

  return (
    <div style={{ width: "100%", padding: "20px", backgroundColor: "#f8f9fa" }}>
    <h2 style={{ textAlign: "center", color: "#333", marginBottom: "15px" }}>
      Planning Grid
    </h2>

    <div
      className="ag-theme-alpine"
      style={{
        height: 600,
        width: "100%",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        backgroundColor: "#fff",
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefsMemo}
        pagination={true}
        paginationPageSize={100}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
          cellStyle: {
            textAlign: "left",
          },
        }}
        rowHeight={40} // Increased row height for readability
      />
    </div>
  </div>
  );
};

export default PlanningGrid;
