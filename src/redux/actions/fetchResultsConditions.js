import {
  fetchResultDate,
  fetchResultDateAndBeds,
  fetchResultDateAndBedsAndSupply,
  fetchResultDateAndBedsAndSupplyAndType,
  fetchResultDateAndBedsAndType,
  fetchResultDateAndPrice,
  fetchResultDateAndPriceAndBeds,
  fetchResultDateAndPriceAndBedsAndProvince,
  fetchResultDateAndPriceAndBedsAndProvinceAndSupply,
  fetchResultDateAndPriceAndBedsAndProvinceAndSupplyAndType,
  fetchResultDateAndPriceAndBedsAndProvinceAndType,
  fetchResultDateAndPriceAndBedsAndSupply,
  fetchResultDateAndPriceAndBedsAndType,
  fetchResultDateAndPriceAndProvince,
  fetchResultDateAndPriceAndProvinceAndSupply,
  fetchResultDateAndPriceAndProvinceAndSupplyAndType,
  fetchResultDateAndPriceAndProvinceAndType,
  fetchResultDateAndPriceAndSupply,
  fetchResultDateAndPriceAndSupplyAndType,
  fetchResultDateAndPriceAndType,
  fetchResultDateAndProvince,
  fetchResultDateAndProvinceAndBeds,
  fetchResultDateAndProvinceAndBedsAndSupply,
  fetchResultDateAndProvinceAndBedsAndSupplyAndType,
  fetchResultDateAndProvinceAndBedsAndType,
  fetchResultDateAndProvinceAndSupply,
  fetchResultDateAndProvinceAndSupplyAndType,
  fetchResultDateAndProvinceAndType,
  fetchResultDateAndSupply,
  fetchResultDateAndSupplyAndType,
  fetchResultDateAndType
} from "./fetchResults";

export const resultConditions = (
  startForm,
  endForm,
  prezzo,
  province,
  newBeds,
  supplyVan,
  typeVan,
  token,
  navigate,
  setError,
  isValid,
  isValidBad,
  isValidPrice,
  isValidSupply,
  isValidType
) => {
  return async dispatch => {
    try {
      if (!isValid && !isValidBad && !isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDate(startForm, endForm, token, navigate, setError));
      }
      if (!isValid && !isValidBad && !isValidPrice && isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndSupply(startForm, endForm, supplyVan, token, navigate, setError));
      }
      if (!isValid && !isValidBad && !isValidPrice && isValidSupply && isValidType) {
        dispatch(fetchResultDateAndSupplyAndType(startForm, endForm, supplyVan, typeVan, token, navigate, setError));
      }
      if (!isValid && !isValidBad && !isValidPrice && !isValidSupply && isValidType) {
        dispatch(fetchResultDateAndType(startForm, endForm, typeVan, token, navigate, setError));
      }
      if (!isValid && !isValidBad && isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndPrice(startForm, endForm, prezzo, token, navigate, setError));
      }
      if (!isValid && !isValidBad && isValidPrice && isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndPriceAndSupply(startForm, endForm, prezzo, supplyVan, token, navigate, setError));
      }
      if (!isValid && !isValidBad && isValidPrice && !isValidSupply && isValidType) {
        dispatch(fetchResultDateAndPriceAndType(startForm, endForm, prezzo, typeVan, token, navigate, setError));
      }
      if (!isValid && !isValidBad && isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndSupplyAndType(
            startForm,
            endForm,
            prezzo,
            typeVan,
            supplyVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && isValidPrice && !isValidSupply && !isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBedsAndProvince(
            startForm,
            endForm,
            prezzo,
            province,
            newBeds,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && isValidPrice && isValidSupply && !isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBedsAndProvinceAndSupply(
            startForm,
            endForm,
            prezzo,
            province,
            newBeds,
            supplyVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && isValidPrice && !isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBedsAndProvinceAndType(
            startForm,
            endForm,
            prezzo,
            province,
            newBeds,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBedsAndProvinceAndSupplyAndType(
            startForm,
            endForm,
            prezzo,
            province,
            newBeds,
            supplyVan,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (!isValid && isValidBad && !isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndBeds(startForm, endForm, newBeds, token, navigate, setError));
      }
      if (!isValid && isValidBad && !isValidPrice && isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndBedsAndSupply(startForm, endForm, newBeds, supplyVan, token, navigate, setError));
      }
      if (!isValid && isValidBad && !isValidPrice && !isValidSupply && isValidType) {
        dispatch(fetchResultDateAndBedsAndType(startForm, endForm, newBeds, typeVan, token, navigate, setError));
      }
      if (!isValid && isValidBad && !isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndBedsAndSupplyAndType(
            startForm,
            endForm,
            newBeds,
            supplyVan,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && !isValidBad && !isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndProvince(startForm, endForm, province, token, navigate, setError));
      }
      if (isValid && !isValidBad && !isValidPrice && isValidSupply && !isValidType) {
        dispatch(
          fetchResultDateAndProvinceAndSupply(startForm, endForm, province, supplyVan, token, navigate, setError)
        );
      }
      if (isValid && !isValidBad && !isValidPrice && !isValidSupply && isValidType) {
        dispatch(fetchResultDateAndProvinceAndType(startForm, endForm, province, typeVan, token, navigate, setError));
      }
      if (isValid && !isValidBad && !isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndProvinceAndSupplyAndType(
            startForm,
            endForm,
            province,
            supplyVan,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && !isValidBad && isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndPriceAndProvince(startForm, endForm, prezzo, province, token, navigate, setError));
      }
      if (isValid && !isValidBad && isValidPrice && isValidSupply && !isValidType) {
        dispatch(
          fetchResultDateAndPriceAndProvinceAndSupply(
            startForm,
            endForm,
            prezzo,
            province,
            supplyVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && !isValidBad && isValidPrice && !isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndProvinceAndType(
            startForm,
            endForm,
            prezzo,
            province,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && !isValidBad && isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndProvinceAndSupplyAndType(
            startForm,
            endForm,
            prezzo,
            province,
            supplyVan,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (!isValid && isValidBad && isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndPriceAndBeds(startForm, endForm, prezzo, newBeds, token, navigate, setError));
      }
      if (!isValid && isValidBad && isValidPrice && isValidSupply && !isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBedsAndSupply(
            startForm,
            endForm,
            prezzo,
            newBeds,
            supplyVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (!isValid && isValidBad && isValidPrice && !isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBedsAndType(startForm, endForm, prezzo, newBeds, typeVan, token, navigate, setError)
        );
      }
      if (!isValid && isValidBad && isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndPriceAndBeds(
            startForm,
            endForm,
            prezzo,
            newBeds,
            supplyVan,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && !isValidPrice && !isValidSupply && !isValidType) {
        dispatch(fetchResultDateAndProvinceAndBeds(startForm, endForm, newBeds, province, token, navigate, setError));
      }
      if (isValid && isValidBad && !isValidPrice && isValidSupply && !isValidType) {
        dispatch(
          fetchResultDateAndProvinceAndBedsAndSupply(
            startForm,
            endForm,
            newBeds,
            province,
            supplyVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && !isValidPrice && !isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndProvinceAndBedsAndType(
            startForm,
            endForm,
            newBeds,
            province,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
      if (isValid && isValidBad && !isValidPrice && isValidSupply && isValidType) {
        dispatch(
          fetchResultDateAndProvinceAndBedsAndSupplyAndType(
            startForm,
            endForm,
            newBeds,
            province,
            supplyVan,
            typeVan,
            token,
            navigate,
            setError
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
};
