import Swal from "sweetalert2";

const useSwal = () => {
  const showErrorAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: "Try Again",
      confirmButtonColor: "#5D81AB",
    });
  };

  return { showErrorAlert };
};

export default useSwal;
