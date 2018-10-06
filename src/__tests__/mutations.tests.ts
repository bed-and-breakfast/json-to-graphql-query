
import { expect } from 'chai';
import { jsonToGraphQLQuery } from '../';

describe('jsonToGraphQL() - mutations', () => {

    it('correctly converts mutations with no specified return fields', () => {
        const query = {
            mutation: {
                create_post: {
                    __args: {
                        title: 'My Awesome Post',
                        body: 'This post is awesome!'
                    }
                }
            }
        };
        expect(jsonToGraphQLQuery(query, { pretty: true })).to.equal(
            `mutation {
    create_post (title: "My Awesome Post", body: "This post is awesome!")
}`);
    });

});
