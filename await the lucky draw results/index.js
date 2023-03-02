const people = ['Tina', 'Jorge', 'Julien']


function luckyDraw(player) {
    return new Promise((resolve, reject) => {
      const win = Boolean(Math.round(Math.random()));
  
      process.nextTick(() => {
        if (win) {
          resolve(`${player} won a prize in the draw!`);
        } else {
          reject(new Error(`${player} lost the draw.`));
        }
      });
    });
  }

  const getResults = async (loopPeople, action) => {
    for (const person of loopPeople) {
      try {
        const result = await action(person);
        console.log(result);
      } catch (err) {
        console.log(`${err}`);
      }
    }
  };

  
  getResults(people, luckyDraw);
