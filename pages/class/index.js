import React, { useRef, useState } from "react";
import { Alert, Button, ButtonGroup, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { PanelContentHead } from "../../src/components/atoms/dashboard";
import { Panel, ServerSideTable } from "../../src/components/templates";
import useLocalization from "../../src/lib/useLocalization";
import { DeleteDialog } from "../../src/components/molecules";
import ClassForm from "../../src/components/templates/forms/classForm";
import { Link, PageHead } from "../../src/components/atoms";
import ButtonResponsive from "../../src/components/atoms/ButtonResponsive";
import DownloadIcon from "@mui/icons-material/Download";

const Class = () => {
  const tableRef = useRef(null);
  const {
    panel: {
      pages: { class: classPage },
    },
    table: {
      columns: { class: classTable },
    },
    ...strings
  } = useLocalization();
  const [deleteDialogOpen, setdeleteDialogOpen] = useState(false);
  const [dataToDelete, setdataToDelete] = useState(null);
  const [formOpen, setformOpen] = useState(false);
  const [formMode, setformMode] = useState("add");
  const [formEditId, setformEditId] = useState(null);

  const handleOpenDeleteDialog = (data) => {
    setdataToDelete(data);
    setdeleteDialogOpen(true);
  };

  const handleAddButton = (event) => {
    setformMode("add");
    setformOpen(true);
  };

  const handleEditButton = (id) => {
    setformMode("edit");
    setformEditId(id);
    setformOpen(true);
  };

  const handleFormCallback = (error, data) => {
    try {
      if (typeof tableRef.current.refresh == "function") {
        if (!error) {
          tableRef.current.refresh();
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error();
      }
    }
  };

  const columns = [
    {
      field: "name",
      headerName: classTable.name,
      flex: 1,
    },
    {
      field: "code",
      headerName: classTable.code,
      width: 100,
    },
    {
      field: "semester",
      headerName: classTable.semester,
      width: 150,
      valueGetter: (params) => `${classTable.semester} ${params.value}`,
    },
    {
      field: "angkatan",
      headerName: classTable.angkatan,
    },
    {
      field: "isActive",
      headerName: "Status",
      renderCell: (params) => {
        let isActive = params.value == true;
        let label = isActive
          ? classTable.statusActive
          : classTable.statusInactive;
        let color = isActive ? "success" : "error";
        return (
          <Button fullWidth variant="contained" size="small" color={color}>
            {label}
          </Button>
        );
      },
    },
    {
      field: "id",
      headerName: "Aksi",
      flex: 1,
      renderCell: (params) => {
        return (
          <ButtonGroup>
            <ButtonResponsive
              size="small"
              iconFromScreen="lg"
              variant="contained"
              startIcon={<EditIcon />}
              color="info"
              onClick={() => handleEditButton(params.value)}
            >
              {strings.default.editText}
            </ButtonResponsive>
            <ButtonResponsive
              size="small"
              iconFromScreen="lg"
              variant="contained"
              startIcon={<DeleteIcon />}
              color="error"
              onClick={() => handleOpenDeleteDialog(params.value)}
            >
              {strings.default.deleteText}
            </ButtonResponsive>
            <ButtonResponsive
              size="small"
              iconFromScreen="lg"
              variant="contained"
              startIcon={<DownloadIcon />}
              color="success"
              href={
                process.env.NEXT_PUBLIC_API_URL +
                "/export/administrasi/income/" +
                params.row.id
              }
              target="blank"
            >
              {strings.default.downloadText}
            </ButtonResponsive>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <>
      <PageHead title={classPage.titlePage} />
      <Box>
        <PanelContentHead
          title={classPage.titlePage}
          buttonGroup={
            <ButtonGroup>
              <ButtonResponsive
                variant="contained"
                color="primary"
                iconFromScreen="lg"
                startIcon={<AddIcon />}
                onClick={handleAddButton}
              >
                {strings.default.addText}
              </ButtonResponsive>
            </ButtonGroup>
          }
          helpButtonHandler={(event) =>
            console.log("click tombol bantuan pembayaran")
          }
        />
        <ServerSideTable
          ref={tableRef}
          enableCheckbox={false}
          showDeleteButton={false}
          url="/class"
          columns={columns}
        />
        <DeleteDialog
          dialogOpen={deleteDialogOpen}
          closeHandle={() => setdeleteDialogOpen(false)}
          data={[dataToDelete]}
          additionalMessage={
            <Alert severity="warning" variant="filled">
              {classPage.warningDeleteItem}
            </Alert>
          }
          url="/class"
          refreshTableHandler={() => {
            tableRef.current.refresh();
          }}
        />
        <ClassForm
          open={formOpen}
          mode={formMode}
          id={formEditId}
          handleClose={() => setformOpen(false)}
          callback={handleFormCallback}
        />
      </Box>
    </>
  );
};

Class.getLayout = (page) => <Panel>{page}</Panel>;

export default Class;
