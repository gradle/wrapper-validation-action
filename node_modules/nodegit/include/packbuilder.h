// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPACKBUILDER_H
#define GITPACKBUILDER_H
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

#include "../include/oid.h"
#include "../include/revwalk.h"
#include "../include/repository.h"
// Forward declaration.
struct git_packbuilder {
};

using namespace node;
using namespace v8;

class GitPackbuilder;

struct GitPackbuilderTraits {
  typedef GitPackbuilder cppClass;
  typedef git_packbuilder cType;

  static const bool isDuplicable = false;
  static void duplicate(git_packbuilder **dest, git_packbuilder *src) {
     Nan::ThrowError("duplicate called on GitPackbuilder which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_packbuilder *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_packbuilder_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitPackbuilder : public
  NodeGitWrapper<GitPackbuilderTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitPackbuilderTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                        

  private:
    GitPackbuilder()
      : NodeGitWrapper<GitPackbuilderTraits>(
           "A new GitPackbuilder cannot be instantiated."
       )
    {}
    GitPackbuilder(git_packbuilder *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitPackbuilderTraits>(raw, selfFreeing, owner)
    {}
    ~GitPackbuilder();
                                        
    static NAN_METHOD(Hash);

    struct InsertBaton {
      int error_code;
      const git_error* error;
      git_packbuilder * pb;
      const git_oid * id;
      bool idNeedsFree;
      const char * name;
    };
    class InsertWorker : public Nan::AsyncWorker {
      public:
        InsertWorker(
            InsertBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~InsertWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        InsertBaton *baton;
    };

    static NAN_METHOD(Insert);

    struct InsertCommitBaton {
      int error_code;
      const git_error* error;
      git_packbuilder * pb;
      const git_oid * id;
      bool idNeedsFree;
    };
    class InsertCommitWorker : public Nan::AsyncWorker {
      public:
        InsertCommitWorker(
            InsertCommitBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~InsertCommitWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        InsertCommitBaton *baton;
    };

    static NAN_METHOD(InsertCommit);

    struct InsertRecurBaton {
      int error_code;
      const git_error* error;
      git_packbuilder * pb;
      const git_oid * id;
      bool idNeedsFree;
      const char * name;
    };
    class InsertRecurWorker : public Nan::AsyncWorker {
      public:
        InsertRecurWorker(
            InsertRecurBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~InsertRecurWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        InsertRecurBaton *baton;
    };

    static NAN_METHOD(InsertRecur);

    static NAN_METHOD(InsertTree);

    struct InsertWalkBaton {
      int error_code;
      const git_error* error;
      git_packbuilder * pb;
      git_revwalk * walk;
    };
    class InsertWalkWorker : public Nan::AsyncWorker {
      public:
        InsertWalkWorker(
            InsertWalkBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~InsertWalkWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        InsertWalkBaton *baton;
    };

    static NAN_METHOD(InsertWalk);

    static NAN_METHOD(Create);

    static NAN_METHOD(ObjectCount);

    static NAN_METHOD(SetThreads);

    static NAN_METHOD(Written);
};

#endif
