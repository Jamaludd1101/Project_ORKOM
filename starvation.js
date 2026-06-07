const starvationStages = [
  {
    title: "Starvation - Tahap 1",
    status: "Dokumen biasa masuk antrean.",
    description:
      "Starvation terjadi ketika satu proses terus tertunda karena proses lain selalu diprioritaskan.",
    logs: [
      "[QUEUE] Dokumen biasa dari Mahasiswa A masuk antrean.",
      "[INFO] Printer menunggu dokumen prioritas berikutnya.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "Mahasiswa A", null, ["waiting"]);
      setBox(userB, "box user", "Prioritas Tinggi", null, ["active"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Siap</small>",
        ["idle"],
      );

      hideQueue();

      showQueue([
        {
          title: "Mahasiswa A",
          detail: "Prioritas: Normal",
          priority: "normal",
        },
      ]);
    },
  },

  {
    title: "Starvation - Tahap 2",
    status: "Dokumen prioritas tinggi datang terus.",
    description:
      "Ketika dokumen prioritas tinggi terus datang, dokumen biasa terus tersingkir dari antrean.",
    logs: [
      "[ARRIVE] Dokumen prioritas tinggi datang.",
      "[SCHEDULE] Sistem memilih dokumen prioritas tinggi.",
      "[INFO] Dokumen biasa tetap menunggu.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "Mahasiswa A", null, ["waiting"]);
      setBox(userB, "box user", "Dosen / Prioritas", null, ["active"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Mencetak Prioritas</small>",
        ["active"],
      );

      hideQueue();

      showQueue([
        {
          title: "Dosen 1",
          detail: "Prioritas: Tinggi",
          priority: "high",
        },
        {
          title: "Mahasiswa A",
          detail: "Prioritas: Normal",
          priority: "normal",
        },
      ]);
    },
  },

  {
    title: "Starvation - Tahap 3",
    status: "Mahasiswa A belum juga mendapat giliran.",
    description:
      "Karena sistem selalu memilih prioritas tinggi, dokumen normal bisa terus tertunda tanpa batas.",
    logs: [
      "[ARRIVE] Dosen 2 datang.",
      "[ARRIVE] Dosen 3 datang.",
      "[ARRIVE] Dosen 4 datang.",
      "[WAIT] Mahasiswa A belum diproses.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "Mahasiswa A", null, ["danger"]);
      setBox(userB, "box user", "Prioritas Tinggi", null, ["active"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Selalu Sibuk</small>",
        ["warning"],
      );

      hideQueue();

      showQueue([
        {
          title: "Dosen 2",
          detail: "Prioritas: Tinggi",
          priority: "high",
        },
        {
          title: "Dosen 3",
          detail: "Prioritas: Tinggi",
          priority: "high",
        },
        {
          title: "Dosen 4",
          detail: "Prioritas: Tinggi",
          priority: "high",
        },
        {
          title: "Mahasiswa A",
          detail: "Prioritas: Normal",
          priority: "normal",
        },
      ]);
    },
  },

  {
    title: "Starvation - Tahap 4",
    status: "Mahasiswa A tidak pernah mendapat giliran.",
    description:
      "Ini disebut starvation, yaitu proses tertentu terus menunggu karena selalu kalah prioritas.",
    logs: [
      "[WARNING] Mahasiswa A terus menunggu.",
      "[WARNING] Dokumen prioritas tinggi selalu didahulukan.",
      "[ERROR] Starvation terjadi.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "Mahasiswa A", null, ["danger"]);
      setBox(userB, "box user", "Prioritas Tinggi", null, ["danger"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Starvation</small>",
        ["danger"],
      );

      hideQueue();

      showQueue([
        {
          title: "Mahasiswa A",
          detail: "Tidak pernah mendapat giliran",
          priority: "normal",
        },
        {
          title: "Dosen 5",
          detail: "Prioritas: Tinggi",
          priority: "high",
        },
        {
          title: "Dosen 6",
          detail: "Prioritas: Tinggi",
          priority: "high",
        },
      ]);
    },
  },
];

function loadStarvationSimulation() {
  currentStages = starvationStages;
  currentStep = 0;
  conclusionText.textContent =
    "Starvation terjadi ketika proses prioritas rendah terus kalah dan tidak pernah mendapat giliran.";
  renderStep();
}
