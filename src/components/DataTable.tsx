type DataTableProps = {};

export function DataTable(props: DataTableProps) {
  return (
    <table className="arduino-data-table">
      <thead>
        <tr>
          <th className="text-left">Data</th>
          <th className="text-left">Celsius</th>
          <th className="text-left">PPM</th>
          <th className="text-left">mA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01/01/2021</td>
          <td>25</td>
          <td>100</td>
          <td>0.5</td>
        </tr>
        <tr>
          <td>01/01/2021</td>
          <td>25</td>
          <td>100</td>
          <td>0.5</td>
        </tr>
      </tbody>
    </table>
  );
}
