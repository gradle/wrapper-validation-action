// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREFSPEC_H
#define GITREFSPEC_H
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

// Forward declaration.
struct git_refspec {
};

using namespace node;
using namespace v8;

class GitRefspec;

struct GitRefspecTraits {
  typedef GitRefspec cppClass;
  typedef git_refspec cType;

  static const bool isDuplicable = false;
  static void duplicate(git_refspec **dest, git_refspec *src) {
     Nan::ThrowError("duplicate called on GitRefspec which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_refspec *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_refspec_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitRefspec : public
  NodeGitWrapper<GitRefspecTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRefspecTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                             

  private:
    GitRefspec()
      : NodeGitWrapper<GitRefspecTraits>(
           "A new GitRefspec cannot be instantiated."
       )
    {}
    GitRefspec(git_refspec *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRefspecTraits>(raw, selfFreeing, owner)
    {}
    ~GitRefspec();
                             
    static NAN_METHOD(Direction);

    static NAN_METHOD(Dst);

    static NAN_METHOD(DstMatches);

    static NAN_METHOD(Force);

    struct ParseBaton {
      int error_code;
      const git_error* error;
      git_refspec * refspec;
      const char * input;
      int is_fetch;
    };
    class ParseWorker : public Nan::AsyncWorker {
      public:
        ParseWorker(
            ParseBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ParseWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ParseBaton *baton;
    };

    static NAN_METHOD(Parse);

    static NAN_METHOD(Src);

    static NAN_METHOD(SrcMatches);

    static NAN_METHOD(String);
};

#endif
