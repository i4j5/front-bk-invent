const smartgrid = require('smart-grid');

const settings = {
    outputStyle: 'styl', // less || scss || sass || styl
    columns: 12, // Количество столбцов
    offset: '20px', /* gutter width px || % || rem */
    mobileFirst: true, // mobileFirst ? 'min-width' : 'max-width'
    container: {
        maxWidth: '1160px', // max-width на очень большом экране
        fields: '10px' // Боковые поля
    },
    breakPoints: {
        lg: {
            width: '1100px', /* -> @media (max-width: 1100px) */
        },
        md: {
            width: '960px'
        },
        sm: {
            width: '780px',
            //fields: '15px'
        },
        xs: {
            width: '560px'
        }
        /* 
        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./app/styles/helpers', settings);