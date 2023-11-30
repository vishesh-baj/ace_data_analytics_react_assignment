import Swal from "sweetalert2";

const useSwal = () => {
  const showErrorAlert = (title, text) => {
    Swal.fire({
      position: "top-end",
      title,
      text,
      icon: "error",
      confirmButtonText: "Try Again",
      confirmButtonColor: "#5D81AB",
    });
  };

  return { showErrorAlert };
};

export default useSwal;
