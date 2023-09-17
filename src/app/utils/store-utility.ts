export class StoreUtility {
    static normalize(entityArray: Entity[]) {
        return entityArray.reduce((previousValue, currentValue) => {
            return { ...previousValue, ...{ [currentValue.id]: currentValue } }
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
    static removeCommentsKey(entities: { [id: number]: any }, id: number, postId: number) {
        // console.log('entities',entities)
        const entitie = entities[postId].comments.filter((element: any, index: number) => index !== id - 1);

        console.log('newObj', entitie)
        console.log('entities1', entities)
            if (entities.hasOwnProperty(postId)) {
                entities[postId].comments = entities[postId].comments.filter(
                    (comment: { id: number; }) => comment.id !== id
                );
            }
        console.log('entities2', entities)

        return entities;
    }
    static removeKey(entities: { [id: number]: any }, id: number) {
        const newObj = { ...entities };
        delete newObj[id];
        return newObj;
    }
    static getUniqueUser(id: number, entities: { [id: string]: any }) {
        return entities[id]
    }
}
interface Entity {
    id: number;
}