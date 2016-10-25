
describe('todo api',function(){
    var request, app;
    
    beforeEach(function(){
        app = require('express')();
        app.use('/todo',require('lib/todo'));

        request = require('supertest')(app);
    });

    describe('list GET todo',function(){
        it('should return the list of records',function(){
            request.get('/');
        });
    });

    describe('todo POST',function(){
        it('should post records to the list',function(){
            request.post('/',{
                                "title": "Shoving",
                                "description": "Housing",
                                "username": "Pranay"
                                });
        });
    });

    describe('todo PUT/ :id',function(){
        it('should post update a guid in the list',function(){
            request.put('/',{
                                "guid": "580e7e67faa2f8f82424800b",
                                "fields": {
                                "title": "Clean Prope",
                                "description": "Housing",
                                "username": "Pranay"
                                }
                            });
        });
    });

    describe('todo DELETE/ :id',function(){
        it('should delete a guid in the list',function(){
            request.delete('/',{
                                "guid": "580e807bcb71aea444f035dd"
                            });
        });
    });
})