const tableId = {
    // Root
    noRowsLabel: 'Tidak ada baris',
    noResultsOverlayLabel: 'Hasil tidak ditemukan.',
    errorOverlayDefaultLabel: 'Terjadi kesalahan.',
  
    // Density selector toolbar button text
    toolbarDensity: 'Ukuran',
    toolbarDensityLabel: 'Ukuran',
    toolbarDensityCompact: 'Kecil',
    toolbarDensityStandard: 'Sedang',
    toolbarDensityComfortable: 'Besar',
  
    // Columns selector toolbar button text
    toolbarColumns: 'Kolom',
    toolbarColumnsLabel: 'Pilih kolom',
  
    // Filters toolbar button text
    toolbarFilters: 'Filter',
    toolbarFiltersLabel: 'Tampilkan filter',
    toolbarFiltersTooltipHide: 'Sembunyikan filter',
    toolbarFiltersTooltipShow: 'Tampilkan filter',
    toolbarFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} filter aktif` : `${count} filter aktif`,
  
    // Export selector toolbar button text
    toolbarExport: 'Unduh',
    toolbarExportLabel: 'Unduh',
    toolbarExportCSV: 'Unduh sebagai CSV',
  
    // Columns panel text
    columnsPanelTextFieldLabel: 'Cari kolom',
    columnsPanelTextFieldPlaceholder: 'Nama kolom',
    columnsPanelDragIconLabel: 'Reorder column',
    columnsPanelShowAllButton: 'Tampilkan semua',
    columnsPanelHideAllButton: 'Sembunyikan semua',
  
    // Filter panel text
    filterPanelAddFilter: 'Tambah filter',
    filterPanelDeleteIconLabel: 'Hapus',
    filterPanelOperators: 'Operators',
    filterPanelOperatorAnd: 'And',
    filterPanelOperatorOr: 'Or',
    filterPanelColumns: 'Kolom',
    filterPanelInputLabel: 'Nilai',
    filterPanelInputPlaceholder: 'Filter nilai',
  
    // Filter operators text
    filterOperatorContains: 'contains',
    filterOperatorEquals: 'sama dengan',
    filterOperatorStartsWith: 'dimulai dengan',
    filterOperatorEndsWith: 'diakhiri dengan',
    filterOperatorIs: 'is',
    filterOperatorNot: 'is not',
    filterOperatorAfter: 'is after',
    filterOperatorOnOrAfter: 'is on or after',
    filterOperatorBefore: 'is before',
    filterOperatorOnOrBefore: 'is on or before',
    filterOperatorIsEmpty: 'is empty',
    filterOperatorIsNotEmpty: 'is not empty',
  
    // Filter values text
    filterValueAny: 'apapun',
    filterValueTrue: 'benar',
    filterValueFalse: 'salah',
  
    // Column menu text
    columnMenuLabel: 'Menu',
    columnMenuShowColumns: 'Tampilkan kolom',
    columnMenuFilter: 'Filter',
    columnMenuHideColumn: 'Sembunyikan',
    columnMenuUnsort: 'Reset sort',
    columnMenuSortAsc: 'Sortir menaik',
    columnMenuSortDesc: 'Sortir menurun',
  
    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
      count !== 1 ? `${count} filter aktif` : `${count} filter aktif`,
    columnHeaderFiltersLabel: 'Tampilkan filter',
    columnHeaderSortIconLabel: 'Sortir',
  
    // Rows selected footer text
    footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} baris dipilih`
        : `${count.toLocaleString()} baris dipilih`,
  
    // Total rows footer text
    footerTotalRows: 'Total baris:',
  
    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
      `${visibleCount.toLocaleString()} dari ${totalCount.toLocaleString()}`,
  
    // Checkbox selection text
    checkboxSelectionHeaderName: 'Seleksi Checkbox',
  
    // Boolean cell text
    booleanCellTrueLabel: 'benar',
    booleanCellFalseLabel: 'salah',
  
    // Used core components translation keys
    MuiTablePagination: {},
}

export default tableId