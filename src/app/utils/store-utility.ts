export class StoreUtility {
    static normalize(entityArray: Entity[]) {
        return entityArray.reduce((previousValue, currentValue) => {
            return { ...previousValue,...{[currentValue.id]: currentValue } }
        }, {})
    }
    static unNormalize(entities: { [id: string]: any }) {
        if (!entities) {
            return [];
        } else {
            return Object.keys(entities).map(data => entities[data]);
        }
    }
    static filterDuplicateIds(ids: number[]) {
        return ids.filter((element, index, self) => index === self.indexOf(element))
    }
    static removeKey(entities: { [id: number]: any }, id: number) {
        const newObj = { ...entities };
        delete newObj[id];
        return newObj;
    }
}
interface Entity {
    id: number;
}