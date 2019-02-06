#include <eosiolib/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] twitter : public eosio::contract {
  public:
    twitter(
      name receiver,
      name code,
      datastream<const char*> ds
    ): contract(receiver, code, ds) {}

    [[eosio::action]]
    void tweet(name user, std::string text, uint64_t tweeted_at) {
      require_auth(user);
      post_index posts(_code, _code.value);
      posts.emplace(user, [&](auto& row) {
        row.user = user;
        row.text = text;
        row.tweeted_at = tweeted_at;
      });
    };

  private:
    struct [[eosio::table]] post {
      uint64_t tweeted_at;
      name user;
      std::string text;

      uint64_t primary_key() const { return tweeted_at;}
      uint64_t get_secondary_1() const { return user.value;}
    };
    typedef eosio::multi_index<
      "posts"_n, post,
      indexed_by<"byuser"_n, const_mem_fun<post, uint64_t, &post::get_secondary_1>>
    > post_index;
};

EOSIO_DISPATCH( twitter, (tweet));