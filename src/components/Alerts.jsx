import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const successAlert = (title, text) => {
  MySwal.fire({
    icon: "success",
    background: "#1e1e1e",
    color: "#fff",
    title,
    text,
  });
};

export const errorAlert = (title, text) => {
  MySwal.fire({
    icon: "error",
    background: "#1e1e1e",
    color: "#fff",
    title,
    text,
  });
}
