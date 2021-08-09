export default class SideTasks {
  tasks = new Set<Promise<unknown>>();

  add(task: Promise<unknown>) {
    this.tasks.add(task);

    task.finally(() => {
      this.tasks.delete(task);
    });
  }

  async wait() {
    while (true) {
      const [task] = this.tasks;

      if (!task) {
        break;
      }

      await task.finally(() => {});
    }
  }
}
