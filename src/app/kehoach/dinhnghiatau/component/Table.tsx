"use client";

import React from "react";
import { Button, ConfigProvider, Popconfirm, Space, Table, Typography } from "antd";
import type { TablePaginationConfig, TableProps } from "antd";
import { DeleteOutlined, PlusOutlined, SaveOutlined } from "@ant-design/icons";

type RowActionRender<T> = (record: T) => React.ReactNode;

type Props<T extends object> = {
  title?: React.ReactNode;

  columns: TableProps<T>["columns"];
  data: T[];
  rowKey: TableProps<T>["rowKey"];
  loading?: boolean;
  scrollY?: number | string;
  scrollX?: number | string;
  pagination?: TablePaginationConfig;
  leftSlot?: React.ReactNode;

  onAdd?: () => void;
  onSave?: () => void;
  onEdit?: (record: T) => void;
  onDeleteSelected?: (keys: React.Key[]) => void;
  onDeleteRow?: (record: T) => void;

  renderActions?: RowActionRender<T>;
  selectable?: boolean;
  showIndex?: boolean;
  indexTitle?: string;
  indexWidth?: number;
};

export default function DataTable<T extends object>({
  title,
  columns,
  data,
  rowKey,
  loading,
  scrollY = 520,
  scrollX,
  pagination,
  leftSlot,
  onAdd,
  onEdit,
  onSave,
  onDeleteSelected,
  onDeleteRow,
  renderActions,
  selectable = true,
  showIndex = true,
  indexTitle = "STT",
  indexWidth = 30,
}: Props<T>) {
  const [page, setPage] = React.useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
  });

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([]);

  const rowSelection = selectable
    ? {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
      }
    : undefined;

  const cols = React.useMemo(() => {
    const actionCol =
      onDeleteRow || renderActions
        ? ([
            {
              title: "Thao tác",
              key: "__actions",
              align: "right" as const,
              render: (_: unknown, record: T) => (
                <Space>
                  {renderActions?.(record)}
                  {onDeleteRow && (
                    <Popconfirm
                      title="Xoá dòng này?"
                      okText="Xoá"
                      cancelText="Huỷ"
                      onConfirm={() => onDeleteRow(record)}
                    >
                      <Button danger size="small" icon={<DeleteOutlined />}>
                        Xoá
                      </Button>
                    </Popconfirm>
                  )}
                </Space>
              ),
              width: 120,
            },
          ] as TableProps<T>["columns"])
        : [];

    const indexCol: TableProps<T>["columns"] = showIndex
      ? [
          {
            title: indexTitle,
            dataIndex: "__stt",
            width: indexWidth,
            sorter: (a: any, b: any) => (a.__stt ?? 0) - (b.__stt ?? 0),
            render: (_: any, __: T, idx: number) =>
              ((page.current ?? 1) - 1) * (page.pageSize ?? 50) + idx + 1,
            align: "center",
          },
        ]
      : [];

    return [...indexCol, ...(columns || []), ...actionCol];
  }, [
    columns,
    onDeleteRow,
    renderActions,
    showIndex,
    indexTitle,
    indexWidth,
    page.current,
    page.pageSize,
  ]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {title ? (
        <Typography.Title level={4} style={{ marginTop: 0, marginBottom: 25, borderBottom: "1px solid #ced4da", padding: 25}}>
          {title}
        </Typography.Title>
      ) : null}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 px-5 pb-4">
        <div className="min-w-0">{leftSlot}</div>

        <div className="flex items-center gap-2">
          <span className="text-slate-600">
            Số dòng: {data.length.toLocaleString()}
          </span>

          {selectable && (
            <>
              <Button
                onClick={() =>
                  setSelectedRowKeys(
                    data.map(
                      (d: any, i) =>
                        (typeof rowKey === "function"
                          ? rowKey(d)
                          : (d as any)[rowKey as string]) ?? i
                    )
                  )
                }
              >
                Chọn tất cả
              </Button>
              <Button onClick={() => setSelectedRowKeys([])}>Bỏ chọn</Button>
            </>
          )}

          {onDeleteSelected && (
            <Popconfirm
              title={`Xoá ${selectedRowKeys.length} dòng?`}
              okText="Xoá"
              cancelText="Huỷ"
              onConfirm={() => {
                onDeleteSelected(selectedRowKeys);
                setSelectedRowKeys([]);
              }}
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                disabled={selectedRowKeys.length === 0}
              >
                Xóa dòng
              </Button>
            </Popconfirm>
          )}

          {onAdd && (
            <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
              Thêm dòng
            </Button>
          )}

          {onEdit && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => onEdit(data[0])}>
              Sửa dòng
            </Button>
          )}

          {onSave && (
            <Button icon={<SaveOutlined />} onClick={onSave}>
              Lưu
            </Button>
          )}
        </div>
      </div>
      <div className="px-5">
        <ConfigProvider
        theme={{
        }}
        >
          <Table<T>
            size="middle"
            sticky
            rowSelection={rowSelection}
            rowKey={rowKey}
            columns={cols}
            dataSource={data}
            loading={loading}
            scroll={{ y: scrollY, x: scrollX }}
            pagination={pagination ?? page}
            onChange={(p) => setPage(p as TablePaginationConfig)}
            bordered
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
