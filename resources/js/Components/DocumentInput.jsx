import MaskedInput from 'react-text-mask';
import { forwardRef } from 'react';

const documentTypes = {
  cpf: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  cnpj: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
};

export default forwardRef(({ documentType, ...otherProps }, inputRef) => {
  const type = documentType || 'cpf';

  return (
    <MaskedInput
      {...otherProps}
      ref={(ref) => inputRef(ref ? ref.inputElement : null)}
      mask={documentTypes[type]}
    />
  );
});
