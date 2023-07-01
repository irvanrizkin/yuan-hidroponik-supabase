class TimeGroup {
  constructor(data) {
    this.data = data;
  }

  groupPerHour() {
    const groupResult = {};

    this.data.map(item => {
      const createdAt = new Date(item.createdAt);
        const hour = createdAt.getHours();

        if (!groupResult[hour]) {
          groupResult[hour] = item;
        }
    })

    const results = Object.values(groupResult);
    return results;
  }

  groupPerDay() {
    const groupResult = {};

    this.data.map(item => {
      const createdAt = new Date(item.createdAt);
        const [date] = createdAt.toISOString().split('T')

        if (!groupResult[date]) {
          groupResult[date] = item;
        }
    })

    const results = Object.values(groupResult);
    return results;
  }
}

module.exports = TimeGroup;
