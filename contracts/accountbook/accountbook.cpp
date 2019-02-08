#include <eosiolib/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] accountbook : public eosio::contract {
  public:
    accountbook(
      name receiver,
      name code,
      datastream<const char*> ds
    ): contract(receiver, code, ds) {}

    [[eosio::action]]
    void create(
      name user,
      std::string name,
      std::string mail,
      std::string about
    ) {
      require_auth(user);
      account_index accounts(_code, _code.value);
      auto iterator = accounts.find(user.value);
      eosio_assert(iterator == accounts.end(), "Record already exists");
      accounts.emplace(user, [&](auto& row) {
        row.key = user;
        row.name = name;
        row.mail = mail;
        row.about = about;
      });
    }

    [[eosio::action]]
    void update(
      name user,
      std::string name,
      std::string mail,
      std::string about
    ) {
      require_auth(user);
      account_index accounts(_code, _code.value);
      auto iterator = accounts.find(user.value);
      eosio_assert(iterator != accounts.end(), "Record does not exist");
      accounts.modify(iterator, user, [&](auto& row) {
        row.key = user;
        row.name = name;
        row.mail = mail;
        row.about = about;
      });
    }

    [[eosio::action]]
    void erase(name user) {
      require_auth(user);
      account_index accounts(_code, _code.value);
      auto iterator = accounts.find(user.value);
      eosio_assert(iterator != accounts.end(), "Record does not exist");
      accounts.erase(iterator);
    }

  private:
    struct [[eosio::table]] person {
      name key;
      std::string name;
      std::string mail;
      std::string about;

      uint64_t primary_key() const { return key.value;}
    };
    typedef eosio::multi_index<"people"_n, person> account_index;
};


EOSIO_DISPATCH( accountbook, (create)(update)(erase))