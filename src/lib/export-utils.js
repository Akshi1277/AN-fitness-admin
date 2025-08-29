/**
 * Exports data to a CSV file
 * @param {Array} data - The data to export
 * @param {string} filename - The name of the file to save as
 * @param {Array} columns - The columns to include in the export
 */
export function exportToCsv(data, filename, columns) {
  if (!data || data.length === 0) return;

  // Get headers
  const headers = columns.map(col => `"${col.header}"`).join(',');
  
  // Get rows
  const rows = data.map(item => {
    return columns.map(col => {
      let value = col.render ? col.render(item) : item[col.key];
      
      // Handle nested objects
      if (col.key.includes('.')) {
        value = col.key.split('.').reduce((obj, key) => obj?.[key], item);
      }
      
      // Convert to string and escape quotes
      const strValue = String(value ?? '').replace(/"/g, '""');
      return `"${strValue}"`;
    }).join(',');
  }).join('\n');

  // Create CSV content
  const csvContent = [headers, ...rows].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports data to a JSON file
 * @param {Array} data - The data to export
 * @param {string} filename - The name of the file to save as
 */
export function exportToJson(data, filename) {
  if (!data) return;
  
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports data to Excel format (XLSX)
 * @param {Array} data - The data to export
 * @param {string} filename - The name of the file to save as
 * @param {Array} columns - The columns to include in the export
 */
export async function exportToExcel(data, filename, columns) {
  try {
    // Dynamically import xlsx library only when needed
    const XLSX = await import('xlsx');
    
    // Prepare data for Excel
    const excelData = data.map(item => {
      const row = {};
      columns.forEach(col => {
        let value = col.render ? col.render(item) : item[col.key];
        
        // Handle nested objects
        if (col.key.includes('.')) {
          value = col.key.split('.').reduce((obj, key) => obj?.[key], item);
        }
        
        row[col.header] = value;
      });
      return row;
    });
    
    // Create worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    
    // Generate and download the file
    XLSX.writeFile(workbook, `${filename}.xlsx`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    throw error;
  }
}
