const synchronizationStages = [
  {
    title: "Synchronization - Tahap 1",
    status: "Kondisi Normal",
    description:
      "Printer menggunakan mekanisme sinkronisasi (mutex). User A mendapat akses printer, sedangkan User B menunggu giliran.",
    logs: [
      "[INFO] User A mengirim dokumen.",
      "[LOCK] Mutex diberikan kepada User A.",
      "[WAIT] User B menunggu giliran.",
      "[PRINT] Printer mencetak dokumen User A.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["active"]);
      setBox(userB, "box user", "User B", null, ["warning"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Mencetak User A</small>",
        ["active"],
      );

      if (typeof mutexBox !== "undefined") {
        setBox(mutexBox, "box mutex", null, "Mutex<br><small>LOCKED</small>", [
          "success",
        ]);
      }

      showQueue([
        {
          title: "User B",
          detail: "Menunggu giliran",
          priority: "normal",
        },
      ]);
    },
  },

  {
    title: "Synchronization - Tahap 2",
    status: "Muncul Masalah",
    description:
      "Mutex dihilangkan. User A dan User B mencoba menggunakan printer secara bersamaan.",
    logs: [
      "[WARNING] Mutex tidak digunakan.",
      "[ACCESS] User A mengakses printer.",
      "[ACCESS] User B mengakses printer.",
      "[ERROR] Terjadi akses bersamaan.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["danger"]);
      setBox(userB, "box user", "User B", null, ["danger"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Akses Bersamaan</small>",
        ["danger"],
      );

      if (typeof mutexBox !== "undefined") {
        setBox(
          mutexBox,
          "box mutex",
          null,
          "Mutex<br><small>Tidak Aktif</small>",
          ["danger"],
        );
      }

      hideQueue();
    },
  },

  {
    title: "Synchronization - Tahap 3",
    status: "Analisis Penyebab",
    description:
      "Printer adalah shared resource. Tanpa sinkronisasi, dua proses dapat mengakses resource yang sama pada waktu bersamaan sehingga terjadi race condition.",
    logs: [
      "[ANALISIS] Printer merupakan shared resource.",
      "[ANALISIS] Tidak ada mutual exclusion.",
      "[ANALISIS] Terjadi race condition.",
      "[WARNING] Data cetak dapat bertabrakan.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["warning"]);
      setBox(userB, "box user", "User B", null, ["warning"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Race Condition</small>",
        ["danger"],
      );

      if (typeof mutexBox !== "undefined") {
        setBox(
          mutexBox,
          "box mutex",
          null,
          "Mutex<br><small>Tidak Ada</small>",
          ["warning"],
        );
      }

      hideQueue();
    },
  },

  {
    title: "Synchronization - Tahap 4",
    status: "Solusi",
    description:
      "Sistem menerapkan mutex sehingga hanya satu user yang dapat menggunakan printer pada satu waktu.",
    logs: [
      "[SOLUSI] Mutex diterapkan.",
      "[LOCK] User A memperoleh lock.",
      "[WAIT] User B masuk antrean.",
      "[INFO] Printer aman digunakan.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["active"]);
      setBox(userB, "box user", "User B", null, ["warning"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Protected by Mutex</small>",
        ["success"],
      );

      if (typeof mutexBox !== "undefined") {
        setBox(mutexBox, "box mutex", null, "Mutex<br><small>LOCKED</small>", [
          "success",
        ]);
      }

      showQueue([
        {
          title: "User B",
          detail: "Menunggu lock dilepas",
          priority: "normal",
        },
      ]);
    },
  },

  {
    title: "Synchronization - Tahap 5",
    status: "Hasil Setelah Solusi",
    description:
      "User A selesai mencetak dan melepaskan lock. User B kemudian memperoleh akses printer. Sinkronisasi berhasil.",
    logs: [
      "[RELEASE] User A melepas lock.",
      "[ACCESS] User B memperoleh akses printer.",
      "[PRINT] Dokumen User B dicetak.",
      "[SUCCESS] Sinkronisasi berhasil.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["success"]);
      setBox(userB, "box user", "User B", null, ["active"]);

      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Mencetak User B</small>",
        ["active"],
      );

      if (typeof mutexBox !== "undefined") {
        setBox(
          mutexBox,
          "box mutex",
          null,
          "Mutex<br><small>LOCKED oleh User B</small>",
          ["success"],
        );
      }

      showQueue([]);
    },
  },
];

function loadSynchronizationSimulation() {
  currentStages = synchronizationStages;
  currentStep = 0;
  conclusionText.innerText =
    "Sinkronisasi diperlukan untuk mengatur akses beberapa proses terhadap resource bersama. Dengan mutex, race condition bisa dicegah dan data tetap konsisten.";
  renderStep();
}
