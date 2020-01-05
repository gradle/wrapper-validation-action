// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTRANSACTION_H
#define GITTRANSACTION_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/repository.h"
#include "../include/reflog.h"
#include "../include/signature.h"
#include "../include/oid.h"
// Forward declaration.
struct git_transaction {
};

using namespace node;
using namespace v8;

class GitTransaction;

struct GitTransactionTraits {
  typedef GitTransaction cppClass;
  typedef git_transaction cType;

  static const bool isDuplicable = false;
  static void duplicate(git_transaction **dest, git_transaction *src) {
     Nan::ThrowError("duplicate called on GitTransaction which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_transaction *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_transaction_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitTransaction : public
  NodeGitWrapper<GitTransactionTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTransactionTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                   

  private:
    GitTransaction()
      : NodeGitWrapper<GitTransactionTraits>(
           "A new GitTransaction cannot be instantiated."
       )
    {}
    GitTransaction(git_transaction *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTransactionTraits>(raw, selfFreeing, owner)
    {}
    ~GitTransaction();
                                   
    static NAN_METHOD(Commit);

    static NAN_METHOD(LockRef);

    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_transaction * out;
      git_repository * repo;
    };
    class CreateWorker : public Nan::AsyncWorker {
      public:
        CreateWorker(
            CreateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateBaton *baton;
    };

    static NAN_METHOD(Create);

    static NAN_METHOD(Remove);

    static NAN_METHOD(SetReflog);

    static NAN_METHOD(SetSymbolicTarget);

    static NAN_METHOD(SetTarget);
};

#endif
