import utils from './utils';

/* -------------------------------------------------------------------------- */
/*                                   choices                                   */
/* -------------------------------------------------------------------------- */
const choicesInit = () => {
  if (window.Choices) {
    const elements = document.querySelectorAll('.js-choice');
    elements.forEach((item) => {
      const userOptions = utils.getData(item, 'options');
      const choices = new window.Choices(item, {
        itemSelectText: '',
        ...userOptions,
      });

      return choices;
    });
  }
};

export default choicesInit;
