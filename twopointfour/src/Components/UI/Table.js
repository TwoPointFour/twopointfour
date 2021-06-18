import styles from "./Table.module.css";

const Table = (props) => {
  console.log(props.data);
  const tableData = props.data.map((ele, i) => {
    return (
      <tr>
        <td>{i + 1}</td>
        <td>{ele[0]}</td>
        <td>{ele[1]}</td>
      </tr>
    );
  });

  return (
    <table className={`${styles.table} ${styles[props.size]}`}>
      <thead>
        <tr>
          <th>Set</th>
          <th>Timing</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );
};

export default Table;
