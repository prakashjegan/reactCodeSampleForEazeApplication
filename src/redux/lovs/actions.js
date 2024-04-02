import constants from './constants';

export const saveLOVLanguage = payload => {
    return {
        type: constants.LOVS_LANGUAGE,
        payload,
    };
};
