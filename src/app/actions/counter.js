import { createAction } from 'redux-act';

// export const lineObtained = createAction('line Read.');
export const mixTreeValue = createAction('mixTreeValue');
export const mixValue = createAction('mixValue');
export const getLine = (line) =>
(dispatch) => {
  const [orderDate, DeliveryCountry, Manufacturer, Gender, Size, , , Count] = line.split(/\t/);
  const c = Number(Count);
  dispatch(mixTreeValue({key:'manufacturersByGender', value:Gender, second:Manufacturer, c}));

  dispatch(mixTreeValue({key:'manufacturersByCountry', value:DeliveryCountry, second:Manufacturer, c}));
  // obj.sizesByCountry[Size][DeliveryCountry]=c;
  dispatch(mixTreeValue({key:'sizesByCountry', value:DeliveryCountry, second:Size, c}));
  const Month = orderDate.replace(/^\d+\//,'');
  // obj.months[Month]=c;
  dispatch(mixValue({key:'Month', value: Month, c}));
  dispatch(mixValue({key:'Manufacturer', value: Manufacturer, c}));
  dispatch(mixValue({key:'DeliveryCountry', value: DeliveryCountry, c}));
  dispatch(mixValue({key:'Size', value: Size, c}));
  dispatch(mixValue({key:'Gender', value: Gender, c}));
  dispatch(mixTreeValue({key:'monthsByCountry', value:DeliveryCountry, second:Month, c}));
};
