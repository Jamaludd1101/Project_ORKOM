const deadlockStages = [
  {
    title: "Deadlock - Tahap 1",
    status: "Mahasiswa A memegang Printer 1, Mahasiswa B memegang Printer 2.",
    description:
      "Deadlock muncul saat dua proses saling menahan resource dan sama-sama menunggu resource milik proses lain.",
    logs: [
      "[INFO] Mahasiswa A mengambil Printer 1.",
      "[INFO] Mahasiswa B mengambil Printer 2.",
      "[INFO] Keduanya belum saling menunggu.",
    ],
    render: () => {
      resetVisual();

      printer2.classList.remove("hidden");

      setBox(userA, "box user", "Mahasiswa A", null, ["active"]);
      setBox(userB, "box user", "Mahasiswa B", null, ["active"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Dimiliki A</small>",
        ["active"],
      );
      setBox(
        printer2,
        "box printer",
        null,
        "Printer 2<br><small>Dimiliki B</small>",
        ["active"],
      );

      hideQueue();
    },
  },

  {
    title: "Deadlock - Tahap 2",
    status: "A menunggu Printer 2, tetapi Printer 2 masih dipegang B.",
    description:
      "A sudah memegang satu printer, tetapi butuh printer lain yang sedang dipakai B.",
    logs: [
      "[REQUEST] Mahasiswa A meminta Printer 2.",
      "[WAIT] Printer 2 masih dipegang B.",
      "[INFO] A tidak bisa lanjut.",
    ],
    render: () => {
      resetVisual();

      printer2.classList.remove("hidden");

      setBox(userA, "box user", "Mahasiswa A", null, ["warning"]);
      setBox(userB, "box user", "Mahasiswa B", null, ["active"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Dimiliki A</small>",
        ["active"],
      );
      setBox(
        printer2,
        "box printer",
        null,
        "Printer 2<br><small>Dimiliki B</small>",
        ["active"],
      );

      hideQueue();
    },
  },

  {
    title: "Deadlock - Tahap 3",
    status: "B menunggu Printer 1, tetapi Printer 1 masih dipegang A.",
    description:
      "Sekarang B juga menunggu resource milik A. Terjadi circular wait.",
    logs: [
      "[REQUEST] Mahasiswa B meminta Printer 1.",
      "[WAIT] Printer 1 masih dipegang A.",
      "[INFO] B juga tidak bisa lanjut.",
    ],
    render: () => {
      resetVisual();

      printer2.classList.remove("hidden");

      setBox(userA, "box user", "Mahasiswa A", null, ["warning"]);
      setBox(userB, "box user", "Mahasiswa B", null, ["warning"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Dimiliki A</small>",
        ["warning"],
      );
      setBox(
        printer2,
        "box printer",
        null,
        "Printer 2<br><small>Dimiliki B</small>",
        ["warning"],
      );

      hideQueue();
    },
  },

  {
    title: "Deadlock - Tahap 4",
    status: "Kedua proses saling menunggu. Sistem berhenti.",
    description:
      "Tidak ada proses yang bisa maju karena A menunggu B, dan B menunggu A. Inilah deadlock.",
    logs: [
      "[ERROR] Deadlock detected.",
      "[INFO] A menunggu resource milik B.",
      "[INFO] B menunggu resource milik A.",
      "[STOP] Tidak ada proses yang bisa dieksekusi.",
    ],
    render: () => {
      resetVisual();

      printer2.classList.remove("hidden");

      setBox(userA, "box user", "Mahasiswa A", null, ["danger"]);
      setBox(userB, "box user", "Mahasiswa B", null, ["danger"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Terjebak</small>",
        ["danger"],
      );
      setBox(
        printer2,
        "box printer",
        null,
        "Printer 2<br><small>Terjebak</small>",
        ["danger"],
      );

      hideQueue();
    },
  },
];

function loadDeadlockSimulation() {
  currentStages = deadlockStages;
  currentStep = 0;
  conclusionText.textContent =
    "Deadlock terjadi saat dua proses saling memegang resource dan saling menunggu resource lain yang tidak pernah dilepas.";
  renderStep();
}
