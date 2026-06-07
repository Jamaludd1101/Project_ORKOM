const mutexStages = [
  {
    title: "Tahap 1 - Mutex Aktif",
    status: "User A mendapat lock, User B harus menunggu.",
    description:
      "Mutual Exclusion memastikan hanya satu proses yang boleh masuk critical section dalam satu waktu.",
    logs: [
      "[LOCK] Mutex aktif.",
      "[INFO] User A memperoleh akses printer.",
      "[WAIT] User B masuk waiting queue.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["active"]);
      setBox(userB, "box user", "User B", null, ["waiting"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>🔒 LOCK</small>",
        ["lock"],
      );

      hideQueue();
    },
  },

  {
    title: "Tahap 2 - Critical Section",
    status: "Printer hanya melayani User A.",
    description:
      "Saat mutex terkunci, proses lain tidak bisa masuk ke printer sampai lock dilepas.",
    logs: [
      "[INFO] User A sedang berada di critical section.",
      "[INFO] User B masih menunggu.",
      "[INFO] Tidak ada akses bersamaan ke printer.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["active"]);
      setBox(userB, "box user", "User B", null, ["waiting"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Terproteksi</small>",
        ["lock"],
      );

      hideQueue();
    },
  },

  {
    title: "Tahap 3 - Lock Dilepas",
    status: "User A selesai, User B masuk setelah lock dilepas.",
    description:
      "Setelah User A selesai, lock dilepas dan User B baru boleh menggunakan printer.",
    logs: [
      "[UNLOCK] User A selesai mencetak.",
      "[INFO] Lock dilepas.",
      "[INFO] User B memperoleh akses printer.",
      "[SUCCESS] Mutual exclusion berjalan dengan benar.",
    ],
    render: () => {
      resetVisual();

      setBox(userA, "box user", "User A", null, ["success"]);
      setBox(userB, "box user", "User B", null, ["active"]);
      setBox(
        printer1,
        "box printer",
        null,
        "Printer 1<br><small>Siap</small>",
        ["success"],
      );

      hideQueue();
    },
  },
];

function loadMutexSimulation() {
  currentStages = mutexStages;
  currentStep = 0;
  conclusionText.textContent =
    "Mutual exclusion mencegah lebih dari satu proses memakai printer dalam waktu yang sama.";
  renderStep();
}
