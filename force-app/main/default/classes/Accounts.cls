public with sharing class Accounts {
  
  @AuraEnabled(cacheable=true)
  public static List<Account> getAccountsByType(String type) {
    String typesOfAccounts = '%' + type + '%';
    return [
      SELECT Name, Owner.Name, Number_of_Employees__c, Budget__c, Type, Id
      FROM Account
      WHERE Type LIKE :typesOfAccounts
    ];
  }

  @AuraEnabled(cacheable=true)
  public static Account getAccountById(String id) {
    String accountId = id;
    return [
      SELECT
        Name,
        Owner.Name,
        Number_of_Employees__c,
        Budget__c,
        Type,
        Id,
        Industry,
        Description
      FROM Account
      WHERE Id = :accountId
    ];
  }
}
