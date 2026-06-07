const normalStages = [
  {
    title: "Tahap 1 - Kondisi Normal",
    status: "Printer sedang digunakan oleh User A.",
    description:
      "Pada kondisi normal hanya satu proses yang mengakses printer sehingga tidak terjadi konflik.",
    logs: [
      "[INFO] User A mengirim dokumen.",
      "[INFO] Printer menerima dokumen dari User A.",
      "[OK] Printer digunakan oleh satu proses.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["active"]);
      setBox(userB, "box user", "User B", null, ["waiting"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Sedang Dipakai</small>",
        ["active"],
      );

      hideQueue();
    },
  },

  {
    title: "Tahap 2 - Giliran Berikutnya",
    status: "User A selesai, User B mendapatkan akses printer.",
    description:
      "Setelah User A selesai, printer dilepas lalu dipakai User B. Inilah kondisi yang aman dan normal.",
    logs: [
      "[UNLOCK] User A selesai mencetak.",
      "[INFO] Printer dilepas.",
      "[INFO] User B mendapatkan giliran.",
      "[SUCCESS] Tidak ada konflik akses.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["success"]);
      setBox(userB, "box user", "User B", null, ["active"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Aman</small>",
        ["success"],
      );

      hideQueue();
    },
  },
];

function loadNormalSimulation() {
  currentStages = normalStages;
  currentStep = 0;
  conclusionText.textContent =
    "Normal: printer dipakai bergantian tanpa konflik.";
  renderStep();
}
