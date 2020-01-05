// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCONFIGITERATOR_H
#define GITCONFIGITERATOR_H
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

#include "../include/config.h"
#include "../include/config_entry.h"
// Forward declaration.
struct git_config_iterator {
};

using namespace node;
using namespace v8;

class GitConfigIterator;

struct GitConfigIteratorTraits {
  typedef GitConfigIterator cppClass;
  typedef git_config_iterator cType;

  static const bool isDuplicable = false;
  static void duplicate(git_config_iterator **dest, git_config_iterator *src) {
     Nan::ThrowError("duplicate called on GitConfigIterator which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_config_iterator *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_config_iterator_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitConfigIterator : public
  NodeGitWrapper<GitConfigIteratorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitConfigIteratorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                    

  private:
    GitConfigIterator()
      : NodeGitWrapper<GitConfigIteratorTraits>(
           "A new GitConfigIterator cannot be instantiated."
       )
    {}
    GitConfigIterator(git_config_iterator *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitConfigIteratorTraits>(raw, selfFreeing, owner)
    {}
    ~GitConfigIterator();
                    
    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_config_iterator * out;
      const git_config * cfg;
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

    struct GlobNewBaton {
      int error_code;
      const git_error* error;
      git_config_iterator * out;
      const git_config * cfg;
      const char * regexp;
    };
    class GlobNewWorker : public Nan::AsyncWorker {
      public:
        GlobNewWorker(
            GlobNewBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GlobNewWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GlobNewBaton *baton;
    };

    static NAN_METHOD(GlobNew);

    struct GitConfigMultivarIteratorNewBaton {
      int error_code;
      const git_error* error;
      git_config_iterator * out;
      const git_config * cfg;
      const char * name;
      const char * regexp;
    };
    class GitConfigMultivarIteratorNewWorker : public Nan::AsyncWorker {
      public:
        GitConfigMultivarIteratorNewWorker(
            GitConfigMultivarIteratorNewBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GitConfigMultivarIteratorNewWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GitConfigMultivarIteratorNewBaton *baton;
    };

    static NAN_METHOD(GitConfigMultivarIteratorNew);

    static NAN_METHOD(GitConfigNext);
};

#endif
