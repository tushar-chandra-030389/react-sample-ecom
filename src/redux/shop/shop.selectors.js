import { createSelector } from 'reselect';

export const selectShopData = (state) => state.shop;

export const selectShopCollections = (state) => selectShopData(state).collections;

export const selectShopCollectionsForOverview = createSelector(
    [selectShopCollections],
    (collections) =>{
        console.log('selectShopCollectionsForOverview')
        return Object.keys(collections).map(key => collections[key]);
    }
);

export const createSelectShopCollection = () => {
    return createSelector(
        [
            selectShopCollections,
            (state, routeName) => routeName,
        ],
        (collections, routeName) => {
            console.log('selectShopCollection', routeName)
            return collections[routeName];
        }, 
    );
};

export const selectShopDataFetching = (state) => {
    return selectShopData(state).isFetching;
}