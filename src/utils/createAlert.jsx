import Swal from "sweetalert2";

export const createAlert = (icon, text) => {
  Swal.fire({
    title: text || "info",
    icon: icon || "success",
    timer: 3000,
  });
};
