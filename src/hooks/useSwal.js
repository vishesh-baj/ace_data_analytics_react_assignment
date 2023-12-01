import Swal from "sweetalert2";

const useSwal = () => {
  const showErrorAlert = (title, text, icon, confirmButtonText) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText,
      confirmButtonColor: "#5D81AB",
    });
  };

  return { showErrorAlert };
};

export default useSwal;
