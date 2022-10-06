const formatValue = (value) => {
    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(value));
};

export default formatValue;
