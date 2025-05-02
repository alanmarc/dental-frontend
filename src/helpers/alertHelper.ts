// src/utils/swalHelper.ts
import Swal from "sweetalert2";

const swal = Swal.mixin({
  customClass: {
    container: "swal2-zindex",
  },
  buttonsStyling: false,
  backdrop: "rgba(0,0,0,0.4)",
});

export const Alert = {
  success: (title: string, text?: string, timer = 2000) => {
    return swal.fire({
      icon: "success",
      title,
      text,
      timer,
      showConfirmButton: false,
    });
  },

  error: (title: string, text?: string, isHtml = false) => {
    return swal.fire({
      icon: "error",
      title,
      html: isHtml ? text : undefined,
      text: !isHtml ? text : undefined,
      confirmButtonText:
        "<div class='bg-accent pa-3 rounded-lg'><span>Entendido</span></div>",
      footer:
        "<strong class='text-secondary'>Consultar con soporte técnico</strong>",
    });
  },

  // ... otros métodos si los necesitas
};
